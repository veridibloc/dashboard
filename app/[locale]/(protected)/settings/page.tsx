import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { SettingsForm } from '@/features/settings/settingsForm';

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your local application settings here, i.e. setting your signing key, etc</CardDescription>
      </CardHeader>
      <CardContent>
        <SettingsForm />
      </CardContent>
    </Card>
  );
}
