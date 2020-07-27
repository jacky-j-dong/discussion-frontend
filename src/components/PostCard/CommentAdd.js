import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Input,
  Paper,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { getPosts, createPost, addComment } from 'src/actions/socialActions';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    width: 1,
    height: 24
  },
  fileInput: {
    display: 'none'
  }
}));

function CommentAdd({ className, post, ...rest }) {
  const classes = useStyles();
  const { user } = useSelector((state) => state.account);
  const fileInputRef = useRef(null);
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleAddComment = async (value) => {
    console.log('add comment: ' + value);
    try {
      await dispatch(addComment(post.id, '', value));
      enqueueSnackbar('Comment created', {
        variant: 'success'
      });
    } catch (error) {
      enqueueSnackbar('Ooops!', {
        variant: 'error'
      });
    }

  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Avatar
        alt="Person"
        src={user.avatar}
      />
      <Paper
        variant="outlined"
        flexGrow={1}
        component={Box}
        ml={2}
        py={0.5}
        px={2}
      >
        <Input
          disableUnderline
          fullWidth
          onChange={handleChange}
          placeholder="Leave a message"
        />
      </Paper>
      <Tooltip title="Send">
        <IconButton
          color={value.length > 0 ? 'primary' : 'default'}
          onClick={() => handleAddComment(value)}>
          <SendIcon />
        </IconButton>
      </Tooltip>
      <Divider className={classes.divider} />
      {/* <Tooltip title="Attach image">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AddPhotoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Attach file">
        <IconButton
          edge="end"
          onClick={handleAttach}
        >
          <AttachFileIcon />
        </IconButton>
      </Tooltip>
      <input
        className={classes.fileInput}
        ref={fileInputRef}
        type="file"
      /> */}
    </div>
  );
}

CommentAdd.propTypes = {
  className: PropTypes.string
};

export default CommentAdd;
