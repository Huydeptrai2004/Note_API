import { useEffect, useState } from 'react';

const API = 'http://localhost:3000/api/notes';

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. Lấy danh sách lần đầu render
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error(err));
  }, []);

  // 2 + 3. Tạo mới rồi cập nhật state, không reload trang
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const newNote = await res.json();
    setNotes((prev) => [newNote, ...prev]); // mới nhất lên đầu
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        />
        <button type="submit">Thêm Ghi Chú</button>
      </form>

      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}</strong>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteApp;