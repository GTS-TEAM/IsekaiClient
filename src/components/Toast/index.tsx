import { AlertProps, IconButton, Slide } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { removeToast, toastSelector } from 'features/toastSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { StyledToast } from './styles';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const toast = document.querySelector('#toast') as Element;

const Toast = () => {
  const { toasts } = useAppSelector(toastSelector);
  const dispatch = useAppDispatch();
  const containerRef = React.useRef(null);

  useEffect(() => {
    let timmer: NodeJS.Timer;
    if (toasts.length > 0) {
      timmer = setInterval(() => {
        dispatch(removeToast(toasts[0].id));
      }, 3000);
    }

    return () => {
      timmer && clearInterval(timmer);
    };
  }, [dispatch, toasts]);

  return toast
    ? createPortal(
        <StyledToast ref={containerRef}>
          <ul>
            {toasts.map((_toast) => {
              return (
                <li>
                  <Slide container={containerRef.current} direction="right" in={true}>
                    <Alert
                      severity={_toast.type}
                      sx={{ width: '100%' }}
                      action={
                        <IconButton
                          color="inherit"
                          size="small"
                          onClick={() => {
                            dispatch(removeToast(_toast.id));
                          }}
                        >
                          <IoCloseCircleOutline
                            style={{
                              width: 24,
                              height: 24,
                            }}
                          />
                        </IconButton>
                      }
                    >
                      {_toast.content}
                    </Alert>
                  </Slide>
                </li>
              );
            })}
          </ul>
        </StyledToast>,
        toast,
      )
    : null;
};

export default Toast;
