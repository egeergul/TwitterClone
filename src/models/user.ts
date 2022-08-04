class User {
  public uid: string;
  public name: string;
  public username: string;
  public email: string;
  public bio: string;
  public profilePicURL: string;
  public headerPicURL: string;

  /** TODO
   *
   * Followers
   * Following
   * Date of birth
   * Joined Date
   * Tweets
   *
   */

  constructor(
    uid: string,
    name: string,
    username: string,
    email: string,
    bio: string,
    profilePicURL: string,
    headerPicURL: string
  ) {
    (this.uid = uid), (this.name = name);
    this.username = username;
    this.bio = bio;
    this.email = email;
    this.profilePicURL = profilePicURL;
    this.headerPicURL = headerPicURL;
  }

  toString() {
    return (
      "Uid: " +
      this.uid +
      "\nName: " +
      this.name +
      "\nUsername: " +
      this.username +
      "\nEmail: " +
      this.email +
      "\nBio: " +
      this.bio +
      "\nProfile Pic Link: " +
      this.profilePicURL +
      "\nHeader Pic Link: " +
      this.headerPicURL
    );
  }
}

export default User;
