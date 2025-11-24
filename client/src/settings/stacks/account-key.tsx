import {useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {TextInput} from 'react-exo/textinput';
import {View, Pressable} from 'react-native';
import {Button, Prompt, Alert} from 'design';
import {Icon} from 'react-exo/icon';
import {Qr} from '@qrgrid/react/canvas';
import {useCamera} from 'media/cam/context';
import {drawSmoothEdges} from'@qrgrid/styles/canvas';
import {printDocument} from 'settings/utils/print';

import type {Code} from 'react-native-vision-camera';
import type {ModuleStyleFunction} from '@qrgrid/react/canvas';

interface AccountKeyProps {
  mnemonic: string;
  onChangeOwner: (mnemonic: string) => void;
}

export function AccountKey({mnemonic, onChangeOwner}: AccountKeyProps) {
  const {t} = useLingui();
  const {openCamera} = useCamera();

  const [copied, setCopied] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedWords, setEditedWords] = useState<string[]>([]);

  const words = mnemonic ? mnemonic.split(' ') : [];
  const columns = words.length <= 12 ? 3 : 4;

  const handleCopy = async () => {
    if (!mnemonic) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(mnemonic);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handlePaste = async () => {
    let clipboardText = '';
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      clipboardText = await navigator.clipboard.readText();
    }
    if (clipboardText) {
      const words = clipboardText.trim().split(/\s+/);
      setEditedWords(words);
    }
  };

  const handleImportQR = () => {
    openCamera((result: Code) => {
      if (result.value) {
        setEditedWords(result.value.trim().split(' '));
      }
    }, 'code', {forceMode: true});
  };

  const handleShowQR = () => {
    setShowQr(!showQr);
  };

  const handlePrint = () => {
    if (!mnemonic) return;
    printDocument({
      title: t`Account Key - Mnemonic Phrase`,
      warning: {
        title: t`⚠️ Treat your mnemonic phrase with care.`,
        message: t`Do not share it with anyone. Store it securely.`,
      },
      mnemonic: {
        columns,
        phrase: mnemonic,
        showNumbers: true,
        qrcode: true,
      },
    });
  };

  const handleEdit = () => {
    setShowQr(false);
    setIsEditing(true);
    setShowMnemonic(true);
  };

  const handleSave = () => {
    onChangeOwner(editedWords.join(' '));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedWords([]);
    setIsEditing(false);
    setShowMnemonic(false);
  };

  const handleClear = () => {
    setEditedWords([]);
  };

  const handleWordChange = (index: number, value: string) => {
    // Detect if full mnemonic phrase (all words) was provided
    const trimmedValue = value.trim();
    const wordsInInput = trimmedValue.split(/\s+/);

    // If multiple words detected, treat as full mnemonic phrase
    if (wordsInInput.length > 1) {
      setEditedWords(wordsInInput);
    } else {
      // Otherwise, update the current word
      const newWords = [...editedWords];
      newWords[index] = trimmedValue;
      setEditedWords(newWords);
    }
  };

  const qrModuleStyle: ModuleStyleFunction = (ctx, module, qr) => {
    // Scramble the QR code
    if (!showMnemonic) {
      qr.data = qr.data.map(() =>
        qr.reservedBits[module.index]?.type === 'FinderPattern'
          ? 1 : Math.random() > 0.5 ? 0 : 1
      );
    }
    drawSmoothEdges(ctx, module, qr);
  };

  return (
    <View style={styles.root}>
      <Prompt
        title={t`Account Key`}
        message={t`Used to encrypt and sync your data between devices.`}
        showClose={false}
        confirmButton={
          <View style={styles.content}>
            <Alert
              header={t`Treat your mnemonic phrase with care.`}
              body={t`Do not share it with anyone.`}
              mode="Destructive"
              style={styles.alertContainer}
              hasIcon
              icon={
                <Icon name="ph:warning"/>
              }
            />
            <View style={styles.mnemonicDisplay}>
              <View style={styles.wordsContainer}>
                {showQr ? (
                  <View style={[styles.qrContainer, !showMnemonic && styles.qrContainerBlurred]}>
                    <Qr
                      input={mnemonic}
                      size={300}
                      watchKey={showMnemonic ? 'shown' : 'hidden'}
                      bgColor="transparent"
                      moduleStyle={qrModuleStyle}
                      qrOptions={{errorCorrection: 'L'}}
                    />
                  </View>
                ) :
                words.map((word, index) => (
                  <TextInput
                    key={index}
                    selectTextOnFocus={isEditing}
                    pointerEvents={isEditing ? 'auto' : 'none'}
                    style={[styles.wordInput, {flexBasis: `${100 / columns}%`, maxWidth: `${100 / columns}%`}]}
                    value={isEditing ? editedWords[index] || '' : (showMnemonic ? word : '•'.repeat(8))}
                    onChangeText={isEditing ? (value) => handleWordChange(index, value) : undefined}
                    editable={isEditing}
                    placeholder={`${index + 1}`}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                    spellCheck={false}
                  />
                ))}
              </View>
              {!isEditing ? (
                <View style={styles.iconButtons}>
                  <Pressable
                    style={styles.iconButton}
                    onPress={() => setShowMnemonic(!showMnemonic)}>
                    <Icon
                      name={showMnemonic ? 'ph:eye-slash' : 'ph:eye'}
                      size={18}
                      uniProps={(theme) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={handleCopy}>
                    <Icon
                      name={copied ? 'ph:check' : 'ph:copy'}
                      size={18}
                      uniProps={(theme) => ({
                        color: !copied
                          ? theme.colors.mutedForeground
                          : theme.colors.success,
                      })}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={handlePrint}>
                    <Icon
                      name="ph:printer"
                      size={18}
                      uniProps={(theme) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={handleShowQR}>
                    <Icon
                      name={showQr ? 'ph:text-columns' : 'ph:qr-code'}
                      size={18}
                      uniProps={(theme) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.iconButtons}>
                  <Pressable
                    style={styles.iconButton}
                    onPress={handlePaste}>
                    <Icon
                      name="ph:clipboard"
                      size={18}
                      uniProps={(theme) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  </Pressable>
                  <Pressable
                    style={styles.iconButton}
                    onPress={handleImportQR}>
                    <Icon
                      name="ph:scan"
                      size={18}
                      uniProps={(theme) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  </Pressable>
                  {editedWords.length > 0 && (
                    <Pressable
                      style={styles.iconButton}
                      onPress={handleClear}>
                      <Icon
                        name="ph:eraser"
                        size={18}
                        uniProps={(theme) => ({
                          color: theme.colors.mutedForeground,
                        })}
                      />
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            {isEditing ? (
              <View style={styles.actions}>
                <Button
                  label={t`Save`}
                  mode="Primary"
                  state="Default"
                  onPress={handleSave}
                />
                <Button
                  label={t`Cancel`}
                  mode="Secondary"
                  state="Default"
                  onPress={handleCancel}
                />
              </View>
            ) : (
              <View style={styles.actions}>
                <Button
                  label={t`Passkey`}
                  icon={<Icon name="ph:key"/>}
                  showIcon
                  mode="Primary"
                  state="Default"
                  onPress={() => alert(t`Passkey`)}
                />
                <Button
                  label={t`Import`}
                  icon={<Icon name="ph:user-circle-plus"/>}
                  showIcon
                  mode="Primary"
                  state="Default"
                  onPress={handleEdit}
                />
              </View>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    marginTop: theme.display.space4,
    marginBottom: theme.display.space4,
    width: '100%',
    maxWidth: '100%',
  },
  content: {
    gap: theme.display.space4,
    marginTop: theme.display.space4,
    width: '100%',
    maxWidth: '100%',
  },
  alertContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  mnemonicDisplay: {
    padding: theme.display.space4,
    paddingHorizontal: theme.display.space5,
    paddingRight: theme.display.space5 + 50, // Extra space for icons
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    minHeight: 100,
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: '100%',
    maxWidth: '100%',
    position: 'relative',
  },
  qrContainer: {
    marginHorizontal: 15,
  },
  qrContainerBlurred: {
    _web: {
      filter: 'blur(10px)',
    },
  },
  wordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12.8,
    minHeight: 100,
    justifyContent: 'space-between',
  },
  wordInput: {
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightRegular,
    lineHeight: theme.typography.lineHeight3,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    textAlign: 'center',
    flexGrow: 1,
    flexShrink: 1,
  },
  iconButtons: {
    position: 'absolute',
    top: theme.display.space4,
    right: theme.display.space4,
    flexDirection: 'column',
    gap: theme.display.space2,
  },
  iconButton: {
    padding: theme.display.space2,
    borderRadius: theme.display.radius2,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 32,
    minHeight: 32,
  },
  iconButtonDisabled: {
    opacity: 0.4,
  },
  actions: {
    flexDirection: 'row',
    gap: theme.display.space2,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
}));

