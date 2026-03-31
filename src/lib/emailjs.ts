import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_bfx3rnx";
const TEMPLATE_ID = "template_58nyogo";
const PUBLIC_KEY = "r2Ld8bhS061l3FpFi";

emailjs.init(PUBLIC_KEY);

export async function sendContactEmail(data: {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}) {
  return emailjs.send(SERVICE_ID, TEMPLATE_ID, data);
}
