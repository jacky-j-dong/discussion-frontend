import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, createPost, addComment } from 'src/actions/socialActions';

import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import PostAdd from 'src/components/PostAdd';
import PostCard from 'src/components/PostCard';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function SocialFeedView() {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [posts, setPosts] = useState(null);
  const dispatch = useDispatch();
  // const { posts } = useSelector((state) => state.social);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const getPosts = useCallback(() => {
    axios
      .get('/api/posts')
      .then((response) => {
        if (isMountedRef.current) {
          setPosts(response.data.posts);
        }
      });
  }, [isMountedRef]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (!posts) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Social Feed"
    >
      <Container maxWidth="lg">
        <Header />
        <Box mt={3}>
          <PostAdd />
        </Box>
        {posts.map((post) => (
          <Box
            mt={3}
            key={post.id}
          >
            <PostCard post={post} />
          </Box>
        ))}
      </Container>
    </Page>
  );
}

export default SocialFeedView;
