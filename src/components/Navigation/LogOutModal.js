import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Context from "../../context";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function LogOutModal(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(true);
    const { changeAllUsersStatusToOffline } = useContext(Context);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        changeAllUsersStatusToOffline();
        handleClose();
        props.history.push("/simple-blog/verify");
    };

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="simple-modal-title">Log Out</h2>
                    <p id="simple-modal-description">Are you sure ?</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick}
                    >
                        Log out
                    </Button>
                </div>
            </Modal>
        </div>
    );
}

export default withRouter(LogOutModal);
