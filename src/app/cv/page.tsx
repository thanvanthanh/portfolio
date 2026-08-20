import { redirect } from 'next/navigation';

const cvUrl = 'https://docs.google.com/document/d/1zy0CLTFpKulEcNGr6-1J28yXWlbJY-dNKJvHrIdGMnY/edit?usp=sharing';

export default function CVPage() {
  redirect(cvUrl);
}
