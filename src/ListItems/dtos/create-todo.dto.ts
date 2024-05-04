/* eslint-disable prettier/prettier */
export class CreateItemDto {
  id: number;
  activity: string;
  status: string | null;
  CompleteBy: Date | null;
  startedDate: Date | null;
  startedTime: number | null;
  completedDate: Date | null;
  completionTime: Date | null;
}
