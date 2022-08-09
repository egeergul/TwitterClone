import { getFormattedDate } from "../helpers/helpers";

class User {
  public uid: string;
  public name: string;
  public username: string;
  public email: string;
  public isPublic: boolean;
  public bio: string;
  public profilePicURL: string;
  public headerPicURL: string;
  public headerPicFilename: string;
  public profilPicFilename: string;
  public joinedAt: number;

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
    isPublic: boolean,
    bio: string,
    profilePicURL: string,
    profilPicFilename: string,
    headerPicURL: string,
    headerPicFilename: string,
    joinedAt: number
  ) {
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.bio = bio;
    this.isPublic = isPublic;
    this.email = email;
    this.profilePicURL = profilePicURL;
    this.headerPicURL = headerPicURL;
    this.headerPicFilename = headerPicFilename;
    this.profilPicFilename = profilPicFilename;
    this.joinedAt = joinedAt;
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
      "\nIsPublic: " +
      this.isPublic +
      "\nBio: " +
      this.bio +
      "\nProfile Pic Link: " +
      this.profilePicURL +
      "\nProfile Pic Filename: " +
      this.profilPicFilename +
      "\nHeader Pic Link: " +
      this.headerPicURL +
      "\nHeader Pic Filename: " +
      this.headerPicFilename +
      "\nJoined At: " +
      getFormattedDate(this.joinedAt)
    );
  }
}

export default User;
