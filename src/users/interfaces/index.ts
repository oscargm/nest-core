export interface AddUserDto {
  username: string;
  userMail: string;
  userPass: string;
}

export interface ModUserDto extends AddUserDto {}
