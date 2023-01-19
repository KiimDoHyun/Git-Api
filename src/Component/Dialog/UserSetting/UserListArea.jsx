import {
    Checkbox,
    DialogContentText,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const UserListArea = ({
    userList,
    selectedUser,
    onClickDelete,
    onClickList,
}) => {
    return (
        <>
            <DialogContentText>User List</DialogContentText>

            <List>
                {userList.map((item, idx) => (
                    <ListItem
                        key={`${item}${idx}`}
                        secondaryAction={
                            <IconButton onClick={() => onClickDelete(item)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton onClick={() => onClickList(item)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={item === selectedUser}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        "aria-labelledby": `${item}${idx}`,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={`${item}${idx}`} primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default React.memo(UserListArea);
