class User {
  public name: string;
  public email: string;
  public bio: string;
  public profilePicLink: string;

  constructor(
    name: string,
    email: string,
    bio: string,
    profilePicLink: string
  ) {
    this.name = name;
    this.bio = bio;
    this.email = email;
    this.profilePicLink = profilePicLink;
  }

  toString() {
    return (
      "Name: " +
      this.name +
      "\nEmail: " +
      this.email +
      "\nBio: " +
      this.bio +
      "\nProfile Pic Link: " +
      this.profilePicLink
    );
  }
}

export default User;
