import { z } from 'zod';

export const recordSchema = z.object({
    id: z.string(),
    path: z.string(),
});

export const recordsSchema = z.array(recordSchema);

export const RecordList = z.object({
    list: z.array(recordSchema),
});

export interface RecordListSliceType {
    list: z.infer<typeof RecordList>;
    getList: () => Promise<z.infer<typeof recordsSchema>>;
    addRecord: (record: z.infer<typeof recordSchema>) => void;
    removeRecord: (id: string) => void;
}

export type RecordListType = RecordListSliceType;
