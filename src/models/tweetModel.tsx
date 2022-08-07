class TweetModel {
  public messageId: string;
  public uid: string;
  public name: string;
  public username: string;
  public isPinned: boolean;
  public text: string;
  public timestamp: string;
  public mediaURL: string;
  public mediaFilename: string;

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
    messageId: string,
    uid: string,
    name: string,
    username: string,
    isPinned: boolean,
    text: string,
    timestamp: string,
    mediaURL: string,
    mediaFilename: string
  ) {
    this.messageId = messageId;
    this.uid = uid;
    this.name = name;
    this.username = username;
    this.isPinned = isPinned;
    this.text = text;
    this.timestamp = timestamp;
    this.mediaURL = mediaURL;
    this.mediaFilename = mediaFilename;
  }

  toString() {
    return (
      "Message Id: " +
      this.messageId +
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
      "\n\n"
    );
  }
}

export default TweetModel;
