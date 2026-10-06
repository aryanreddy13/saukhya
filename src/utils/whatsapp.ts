import siteConfig from '../content/site.config.json';

/**
 * Returns a standardized, click-to-chat WhatsApp link with prefilled URL-encoded message.
 * @param serviceName Optional specific service name to mention in the inquiry
 * @param customMessage Optional direct custom message override
 */
export function getWhatsAppLink(serviceName?: string, customMessage?: string): string {
  const number = siteConfig.clinic.whatsappRaw || '919820000000';
  
  let message = '';
  if (customMessage) {
    message = customMessage;
  } else if (serviceName && serviceName.trim().length > 0) {
    message = `Hi, I want to book an appointment for ${serviceName.trim()} at Saukhya Clinic.`;
  } else {
    message = `Hi, I want to book an appointment at Saukhya Speech & Hearing Clinic.`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns a WhatsApp link for camp registration with pre-filled form fields.
 */
export function getCampWhatsAppLink(data: {
  parentName: string;
  childAge: string;
  phone: string;
  concern?: string;
  campTitle?: string;
}): string {
  const number = siteConfig.clinic.whatsappRaw || '919820000000';
  const campName = data.campTitle || siteConfig.camp.title || 'Screening Camp';
  
  const text = [
    `Hi, I want to register for the ${campName}.`,
    '',
    `• Parent/Patient Name: ${data.parentName.trim()}`,
    `• Age: ${data.childAge.trim()}`,
    `• Phone: ${data.phone.trim()}`,
    data.concern?.trim() ? `• Concern: ${data.concern.trim()}` : ''
  ].filter(Boolean).join('\n');

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
