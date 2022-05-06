export class Book {

  id?: number;
  title?: string;
  author_id?: number;
  author?: string;
  editor_id?: number;
  editor?: string;
  price?: number;
  isbn?: string;
  note?: string;
  scaffale?: number;

  constructor(id: number | undefined, title: string | undefined, author_id: number | undefined, author: string | undefined, editor_id: number | undefined, editor: string | undefined, price: number | undefined, isbn: string | undefined, note: string | undefined, scaffale: number | undefined) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.author = author;
    this.editor_id = editor_id;
    this.editor = editor;
    this.price = price;
    this.isbn = isbn;
    this.note = note;
    this.scaffale = scaffale;
  }

}
