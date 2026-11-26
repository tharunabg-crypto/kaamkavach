import React, { useEffect, useState } from 'react';
import { Building2, CircleCheck } from 'lucide-react';
import { EmployerLayout } from '../../components/employer/EmployerLayout';
import { Button, Card, SectionHeading, TextField } from '../../components/ui';
import { useAppState } from '../../context/AppStateContext';

export const EmployerProfilePage: React.FC = () => {
  const { employerProfile, updateEmployerProfile } = useAppState();
  const [contactName, setContactName] = useState(employerProfile.contactName);
  const [companyName, setCompanyName] = useState(employerProfile.companyName);
  const [city, setCity] = useState(employerProfile.city);
  const [location, setLocation] = useState(employerProfile.location);
  const [phone, setPhone] = useState(employerProfile.phone);
  const [preferredLanguage, setPreferredLanguage] = useState(employerProfile.preferredLanguage);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setContactName(employerProfile.contactName);
    setCompanyName(employerProfile.companyName);
    setCity(employerProfile.city);
    setLocation(employerProfile.location);
    setPhone(employerProfile.phone);
    setPreferredLanguage(employerProfile.preferredLanguage);
  }, [employerProfile]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateEmployerProfile({
      contactName: contactName.trim(),
      companyName: companyName.trim(),
      city: city.trim(),
      location: location.trim(),
      phone: phone.trim(),
      preferredLanguage: preferredLanguage.trim(),
    });
    setSaved(true);
  };

  return (
    <EmployerLayout>
      <div className="mx-auto max-w-3xl space-y-6">
        <SectionHeading
          eyebrow="Local profile"
          title="Employer profile"
          description="Update the sample workspace details used for locally created opportunities and records."
        />
        {saved && (
          <div role="status" className="flex items-center gap-2 rounded-control border border-status-success/25 bg-status-success-soft p-3 text-sm text-status-success">
            <CircleCheck className="h-4 w-4" />
            Profile saved in this browser.
          </div>
        )}
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center gap-2 border-b border-navy/10 pb-4">
              <Building2 className="h-5 w-5 text-electric" />
              <h2 className="font-display text-lg font-bold text-navy">Business details</h2>
            </div>
            <TextField label="Contact name" value={contactName} onChange={(event) => { setContactName(event.target.value); setSaved(false); }} required maxLength={100} />
            <TextField label="Company or contractor name" value={companyName} onChange={(event) => { setCompanyName(event.target.value); setSaved(false); }} required maxLength={120} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="City" value={city} onChange={(event) => { setCity(event.target.value); setSaved(false); }} required maxLength={80} />
              <TextField label="Area" value={location} onChange={(event) => { setLocation(event.target.value); setSaved(false); }} required maxLength={100} />
              <TextField label="Contact phone" type="tel" value={phone} onChange={(event) => { setPhone(event.target.value); setSaved(false); }} required maxLength={20} />
              <TextField label="Preferred language" value={preferredLanguage} onChange={(event) => { setPreferredLanguage(event.target.value); setSaved(false); }} required maxLength={50} />
            </div>
            <div className="border-t border-navy/10 pt-5">
              <Button type="submit"><CircleCheck className="h-4 w-4" />Save profile locally</Button>
            </div>
          </form>
        </Card>
      </div>
    </EmployerLayout>
  );
};
