import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

export function Post({ author, publishedAt, content }) {

  const [comments, setComments] = useState([
    'Post bacana'
  ]);

  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateAtFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", { locale: ptBR })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,
    { locale: ptBR, addSuffix: true })

  function handleCreateNewComment() {

    event.preventDefault()

    setComments([...comments, newCommentText])

    setNewCommentText('')

  }

  function handleNewCommentChange() {
    event.target.setCustomValidaty('')
    setNewCommentText(event.target.value)
  }

  function handleCommentInvalid() {
    event.target.setCustomValidaty('Esse campo é obrigatório')
  }

  function deleteComment(commentToDelete) {

    const commentWithOutDeleteOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    console.log(commentWithOutDeleteOne);

    setComments(commentWithOutDeleteOne)
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateAtFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>


      </header>

      <div className={styles.content}>

        {content.map(line => {
          if (line.type === 'paragraph') {

            return <p key={line.content}> {line.content}</p>;
          } else if (line.type === 'link') {
            return <p key={line.content}><a href=''>{line.content}</a></p>;

          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder='Deixe um comentario'
          value={newCommentText}
          onChange={handleNewCommentChange}
          onInvalid={handleCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>


      <div className={styles.commentList}>
        {
          comments.map(comment => {
            return (
              <Comment
                key={comment}
                content={comment}
                onDeleteComment={deleteComment}
              />
            )
          })
        }
      </div>

    </article>
  )
}