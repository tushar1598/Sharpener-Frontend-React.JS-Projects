import ProfileForm from "./ProfileForm";
import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>Welcome to Expense Tracker</h1>
      <hr />
      <ProfileForm />
    </section>
  );
};

export default UserProfile;
