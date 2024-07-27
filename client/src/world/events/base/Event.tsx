import {Icon} from 'react-exo/icon';
import {useLocale} from 'settings/hooks/useLocale';
import {Alert} from 'design';

export function Event() {
  const [locale] = useLocale();
  const demoStart = new Date('2024-07-28T12:00:00');
  const demoEnd = new Date('2024-07-28T14:00:00');
  const demoTitle = 'Birthday – Shiner, TX';
  const demo = `${demoStart.toLocaleDateString(locale, {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  })} • ${demoStart.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  })} - ${demoEnd.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  })}`;

  return (
    <Alert
      mode="Default"
      header={demoTitle}
      body={demo}
      hasIcon
      icon={
        <Icon name="ph:cake"/>
      }
    />
  );
}
