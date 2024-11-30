import axios from "axios";
import { useState } from "react";
import { Dialog, DialogActions, DialogDescription, DialogTitle } from "../../components/catalyst/dialog";
import { Button } from "../../components/catalyst/button";
import { EVENT } from "../Events";

export const DeleteEvent = ({onClose, event}: {event: EVENT, onClose: Function})  => {
    const [promptDelete, setPromptDelete] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const deleteEvent = () => {
        if (deleting) {
            return;
        }

        setDeleting(true);
        axios.delete(`/events/${event.id}`).then(() => {
            onClose(true);
            setPromptDelete(false);
            setDeleting(false);
        });
    }

    const onCancel = () => {
        setPromptDelete(false);
        onClose();
    }

    return (
        <>
            <Dialog open={promptDelete} onClose={() => {}}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogDescription>
                    Are you sure, want to delete this Event <b>{event.name}</b>?
                </DialogDescription>
                <DialogActions>
                    <Button plain onClick={onCancel}>Cancel</Button>
                    <Button disabled={deleting} onClick={() => {deleteEvent()}} color="rose">
                        {deleting ? 'Deleting' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
