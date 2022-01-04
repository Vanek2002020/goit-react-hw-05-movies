import { useParams, useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Button from "components/Button/Button";
import MovieCard from "components/MovieCard/MovieCard";
import Container from "components/Container/Container";
import Icon from "images/arrow-back.svg";

export default function MovieDetailsView() {
  const { id } = useParams();
  const location = useLocation();
  console.log("MovieDetailsView", location);
  const pathname = location.state?.from?.pathname;
  const search = location.state?.from?.search;
  console.log("search", search);
  const navigate = useNavigate();

  const onGoBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Button icon={<Icon />} onClick={onGoBack} type="button" text="Go back" />
      {/* <Link to={pathname ? `${pathname}${search}` : '/movies'}>go back</Link> */}
      <MovieCard id={id} />
    </Container>
  );
}
