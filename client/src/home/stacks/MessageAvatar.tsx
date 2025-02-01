import {Image} from 'react-exo/image';
import {useMatrix} from 'app/data/lib/matrix-provider';

interface MessageAvatarProps {
  sender: string;
}

export function MessageAvatar({sender}: MessageAvatarProps) {
  const {users} = useMatrix();
  const user = users.find(user => user.id === sender);
  return user?.avatar ? (
    <Image
      url={user.avatar}
      style={{borderRadius: 50, width: '100%', height: '100%'}}
      resizeMode="cover"
    />
  ) : null;
}
