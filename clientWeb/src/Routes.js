import { connect } from "react-redux";

import EnterUsernameScreen from "screens/EnterUsernameScreen";
import ChatScreen from "screens/ChatScreen";

const Routes = ({ username }) => {
  if (!username) return <EnterUsernameScreen />;
  return <ChatScreen />;
};

const mapState = (state) => {
  const { username } = state.chat;
  return { username };
};

export default connect(mapState)(Routes);
