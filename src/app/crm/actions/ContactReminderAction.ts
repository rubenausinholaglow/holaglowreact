export async function reminderAction(
  date: Date,
  comment: string,
  id: string,
  identifier: string
) {
  const token = localStorage.getItem('token');
  const body = JSON.stringify({
    userId: id,
    taskId: '',
    identifier: identifier,
    date: date,
    reason: comment,
  });

  const res = await fetch(process.env.NEXT_PUBLIC_CONTACTS_API + 'Tasks', {
    cache: 'no-store',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: body,
  });
}
