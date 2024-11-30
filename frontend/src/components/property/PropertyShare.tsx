import { useTranslation } from "react-i18next";
import { useState } from 'react';
import { Share2, Mail, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { Property } from '@/types/property';
import { shareProperty, getShareUrl } from '@/lib/api/share';
import { cn } from '@/lib/utils';
interface PropertyShareProps {
  property: Property;
  onClose?: () => void;
}
export function PropertyShare({
  property,
  onClose
}: PropertyShareProps) {
  const { t } = useTranslation();
  const [isEmailFormOpen, setIsEmailFormOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const shareUrl = getShareUrl(property.id);
  const handleEmailShare = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await shareProperty({
        propertyId: property.id,
        recipientEmail: email,
        message,
        platform: 'email'
      });
      setEmail('');
      setMessage('');
      setIsEmailFormOpen(false);
    } catch (error) {
      console.error('Error sharing property:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSocialShare = async (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`Check out this property: ${property.type} in ${property.location.city}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
    try {
      await shareProperty({
        propertyId: property.id,
        platform
      });
    } catch (error) {
      console.error('Error logging share:', error);
    }
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };
  return <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{t("share.property")}</h3>
        {onClose && <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <span className="sr-only">{t("close")}</span>
            <Share2 className="h-5 w-5" />
          </button>}
      </div>

      <div className="space-y-4">
        {/* Social Share Buttons */}
        <div className="flex justify-center space-x-4">
          <button onClick={() => handleSocialShare('facebook')} className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700">
            <Facebook className="h-5 w-5" />
          </button>
          <button onClick={() => handleSocialShare('twitter')} className="p-2 rounded-full bg-sky-500 text-white hover:bg-sky-600">
            <Twitter className="h-5 w-5" />
          </button>
          <button onClick={() => handleSocialShare('linkedin')} className="p-2 rounded-full bg-blue-700 text-white hover:bg-blue-800">
            <Linkedin className="h-5 w-5" />
          </button>
        </div>

        {/* Copy Link */}
        <div className="flex items-center space-x-2">
          <input type="text" value={shareUrl} readOnly className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          <button onClick={copyToClipboard} className={cn('p-2 rounded-md', isCopied ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}>
            {isCopied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          </button>
        </div>

        {/* Email Share Form */}
        <div>
          <button onClick={() => setIsEmailFormOpen(!isEmailFormOpen)} className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            <Mail className="h-5 w-5 mr-2" />{t("share.via.email")}</button>

          {isEmailFormOpen && <form onSubmit={handleEmailShare} className="mt-4 space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">{t("recipient.email")}</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t("recipient.s.email")} required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">{t("message")}</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={t("add.a.personal.message.optional.")} rows={3} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Email'}
              </button>
            </form>}
        </div>
      </div>
    </div>;
}