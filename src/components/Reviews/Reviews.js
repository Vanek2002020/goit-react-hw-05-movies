import { nanoid } from "nanoid";

import Container from "components/Container/Container";
import List from "components/List/List";

import s from "components/Reviews/Reviews.module.css";

import PropTypes from "prop-types";

export default function Reviews({ reviewsArray }) {
  // console.log('reviewsArray', reviewsArray);

  const splitContent = (text) => {
    let split = text.split(/(?:\r?\n)+/);
    let items = [];
    split.map((item) => {
      items.push(
        <p key={nanoid()} className={s.Reviews__passage}>
          {item}
        </p>
      );
    });
    return items;
  };

  return (
    <Container>
      {reviewsArray.length > 0 ? (
        <List additionalClass={s.Reviews__list}>
          {reviewsArray.map(({ author, author_details, content, id }) => (
            <li key={id} className={s.Reviews__item}>
              <div className={s.Reviews__author}>
                <p className={s.Reviews__constant}>user</p>
                <span>{author}</span> <span>{author_details.rating}</span>
              </div>
              <div className={s.Reviews__text}>{splitContent(content)}</div>
            </li>
          ))}
        </List>
      ) : (
        <h2>Sorry, there are no reviews on this film</h2>
      )}
    </Container>
  );
}

Reviews.propTypes = {
  reviewsArray: PropTypes.array,
};
