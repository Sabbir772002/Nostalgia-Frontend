import React, { useState } from 'react';
import { Paper, TextField, Snackbar, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import MuiAlert from '@material-ui/lab/Alert';
import Loading from './Progress/progress';
import axios from 'axios';
import { styles } from './Style'; // Import styles from the correct location

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const PassChanger = ({ classes }) => {
  const [formData, setFormData] = useState({
    userName: '',
    oldPass: '',
    newPassFirst: '',
    newPassSecond: '',
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/change-password/', formData);
      setMessage(response.data.message);
      setVariant('success');
      setOpen(true);
      setFormData({
        userName: '',
        oldPass: '',
        newPassFirst: '',
        newPassSecond: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
      setVariant('error');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="main-container" style={{ textAlign: 'center' }}>
      <h3 className="title">Change Password</h3>
      <Paper elevation={5} className={classes.paper}>
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
          <label className={classes.field}>
            <span className={classes.name}>Username *</span>
            <TextField
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={classes.formItem__textField}
              placeholder="Enter username"
              variant="outlined"
              fullWidth
              margin="normal"
              autoComplete="new-login"
              inputProps={{ className: classes.input }}
            />
          </label>
          {/* Other fields go here similarly */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.action}
            disabled={loading}
          >
            <SendIcon className={classes.leftIcon} /> Send
          </Button>
        </form>
      </Paper>
      <Snackbar
        className={classes.snack}
        open={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={variant}>{message}</Alert>
      </Snackbar>
      {loading && <Loading />}
    </div>
  );
};

export default withStyles(styles)(PassChanger);
