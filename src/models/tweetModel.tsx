class TweetModel {
  public tweetId: string;
  public uid: string;
  public name: string;
  public username: string;
  public isPinned: boolean;
  public text: string;
  public timestamp: string;
  public mediaURL: string;
  public mediaFilename: string;
  public userProfilePicURL: string;

  /** TODO
   *
   * Date of birth
   *
   */

  constructor(
    tweetId: string,
    uid: string,
    name: string,
    username: string,
    isPinned: boolean,
    text: string,
    timestamp: string,
    mediaURL: string,
    mediaFilename: string,
    userProfilePicURL: string
  ) {
    this.tweetId = tweetId;
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.isPinned = isPinned;
    this.text = text;
    this.timestamp = timestamp;
    this.mediaURL = mediaURL;
    this.mediaFilename = mediaFilename;
    this.userProfilePicURL = userProfilePicURL;
  }

  toString() {
    return (
      "Tweet Id: " +
      this.tweetId +
      "\nUid: " +
      this.uid +
      "\nName: " +
      this.name +
      "\nUsername: " +
      this.username +
      "\nIs pinned: " +
      this.isPinned +
      "\nText: " +
      this.text +
      "\nTimestamp: " +
      this.timestamp +
      "\nMedia URL: " +
      this.mediaURL +
      "\nMedia Filename: " +
      this.mediaFilename +
      "\nUser Profile Picture URL: " +
      this.userProfilePicURL +
      "\n\n"
    );
  }
}

export default TweetModel;
