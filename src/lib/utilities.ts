import * as bcrypt from 'bcrypt';
import DurationConstructor = moment.unitOfTime.DurationConstructor;
import { DurationInputArg1 } from 'moment';

export async function hashString(str: string) {
  return bcrypt.hash(str, 10);
}

export function parseDurationString(timeString: string): {
  value: DurationInputArg1;
  unit: DurationConstructor;
} {
  const match = timeString.match(/^(\d+)([a-zA-Z]+)$/);
  const value = parseInt(match?.[1], 10);

  if (!match || isNaN(value)) {
    throw new Error('Invalid duration format');
  }

  return {
    value,
    unit: match[2] as DurationConstructor,
  };
}
