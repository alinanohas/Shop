import { IBlog } from '../interfaces/blog.interface';

export class Blog implements IBlog {
    constructor(
        public id: number,
        public category: string,
        public title: string,
        public news: string,
        public image: Array<string>

    ) { }
}