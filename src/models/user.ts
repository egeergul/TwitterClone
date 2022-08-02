class User {
  public name: string;
  public username: string;
  public email: string;
  public bio: string;
  public profilePicURL: string;

  /** TODO
   *
   * Followers
   * Following
   * Date of birth
   * Joined Date
   * Username
   * Tweets
   * Header Img Url
   *
   */

  constructor(
    name: string,
    username: string,
    email: string,
    bio: string,
    profilePicURL: string
  ) {
    this.name = name;
    this.username = username;
    this.bio = bio;
    this.email = email;
    this.profilePicURL = profilePicURL;
  }

  toString() {
    return (
      "Name: " +
      this.name +
      "\nUsername: " +
      this.username +
      "\nEmail: " +
      this.email +
      "\nBio: " +
      this.bio +
      "\nProfile Pic Link: " +
      this.profilePicURL
    );
  }
}

export default User;
