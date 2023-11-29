export const phoneFormatter = '+1 (###) ###-####';

export const phoneParser = v => v.replace('+1', '').replace(/[()/\s-]/g, '');
