/* eslint-disable prettier/prettier */
export class CreateItemDto {
  id: number;
  activity: string | null;
  status: string | null;
  CompleteBy: Date | null;
  startedDate: Date | null;
  startedTime: number | null;
  completedDate: Date | null;
  completedTime: number | null;
}
