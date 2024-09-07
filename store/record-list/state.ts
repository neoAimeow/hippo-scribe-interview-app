import { RecordList } from './type';
import { z } from 'zod';

export const initialList: z.infer<typeof RecordList> = {
    list: [],
};
