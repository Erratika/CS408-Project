import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import Typography from '@material-ui/core/Typography'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Map from '../map/Map'
import InputRange from 'react-input-range'
import TagCloud from "../tagcloud/TagCloud";


const drawerWidth = 260;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    }

});

class Dashboard extends React.Component {
    state = {
        open: true,
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    };

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    open={this.state.open}
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                >
                    <div>
                        <IconButton onClick={this.toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                    <Divider/>
                        {['General', 'Rooms', 'Facilities', 'Policies', 'Reviews'].map((text, index) => (
                            <ExpansionPanel>
                                <ExpansionPanelSummary>
                                    <Typography>
                                        {text}
                                    </Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    Content
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}>
                        <Map/>
                        <TagCloud/>
                        <TagCloud/>
                    </div>
                </main>
            </div>
        );
    }
}


Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Dashboard);