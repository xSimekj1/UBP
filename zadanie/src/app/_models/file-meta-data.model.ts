import { Comment } from './comment.model';

export interface FileMetadata {
    id: number;
    filename: string;
    senderUsername: string;
    downloadable: boolean;
    comments: Array<Comment>
}
