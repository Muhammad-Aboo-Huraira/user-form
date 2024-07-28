import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Group1 from "../../assets/Group 1.png";
import SelectedUserForm from "../../assets/SelectedUserForm.png";
import UnSelectedUserForm from "../../assets/UnSelectedUserForm.png";
import SelectedUserTable from "../../assets/SelectedUserTable.png";
import UnSelectedUserTable from "../../assets/UnSelectedUserTable.png";
import Toolbar from "@mui/material/Toolbar";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar(props) {
  const { window, data } = props;
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleSidebarItemClick = (path) => {
    navigate(path);
  };

  const sidebarData = [
    {
      text: "User Form",
      icon:
        location.pathname === "/" ? (
          <Avatar
            src={SelectedUserForm}
            sx={{ height: 20, width: 20, borderRadius: 0 }}
          />
        ) : (
          <Avatar
            src={UnSelectedUserForm}
            sx={{ height: 20, width: 20, borderRadius: 0 }}
          />
        ),
      path: "/",
    },
    {
      text: "User Table",
      icon:
        location.pathname === "/usertable" ? (
          <Avatar
            src={SelectedUserTable}
            sx={{ height: 20, width: 20, borderRadius: 0 }}
          />
        ) : (
          <Avatar
            src={UnSelectedUserTable}
            sx={{ height: 20, width: 20, borderRadius: 0 }}
          />
        ),
      path: "/usertable",
    },
  ];

  const drawer = (
    <Box sx={{ fontFamily: "Noto Sans, sans-serif" }}>
      <Toolbar>
        <Avatar
          src={Group1}
          sx={{ borderRadius: 0, height: 15.5, width: 15.5 }}
        />
      </Toolbar>
      <List>
        {sidebarData.map((item, index) => (
          <Box sx={{ margin: "20px" }} key={index}>
            <ListItem
              key={item.index}
              disablePadding
              onClick={() => handleSidebarItemClick(item.path)}
            >
              <ListItemButton
                sx={{
                  backgroundColor:
                    location.pathname === item.path ? "#7A5CFA" : "transparent",
                  "&:hover": {
                    backgroundColor:
                      location.pathname === item.path ? "#7A5CFA" : "white",
                  },
                  borderRadius: "3px",
                }}
                onClick={() => handleSidebarItemClick(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  sx={{
                    color:
                      location.pathname === item.path ? "white" : "#828282",
                    "& .css-10hburv-MuiTypography-root": {
                      fontFamily: "Noto Sans, sans-serif",
                    },
                  }}
                >
                  {item.text}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </Box>
        ))}
      </List>
    </Box>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex", padding: "20px" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#ffffff",
          boxShadow: "none",
        }}
      >
        <IconButton
          color="#B5B5B5"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <Avatar
            src={Group1}
            sx={{ borderRadius: 0, height: 15.5, width: 15.5 }}
          />
        </IconButton>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              height: "90%",
              mt: "2rem",
              borderRadius: "3px",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "white",
          borderRadius: "3px",
          height: "100%",
        }}
      >
        {data}
      </Box>
    </Box>
  );
}
