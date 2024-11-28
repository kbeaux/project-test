import { UserAddressDto } from '../dto/create-user.dto';

export function formatFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  return phoneRegex.test(phone);
}

export function validateAddress(address: UserAddressDto): boolean {
  return !!(
    address.street &&
    address.city &&
    address.zipCode &&
    address.country
  );
}

export function formatAddress(address: UserAddressDto): string {
  return `${address.street}, ${address.city}, ${address.zipCode}, ${address.country}`;
}