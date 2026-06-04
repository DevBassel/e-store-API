export const resetUserPasswordTemp = ({ username }: { username: string }) => `
<div>
<h1>Password Changed Successfully ^_^</h1>
<p>Dear ${username}</p>
<p>your password has been changed successfully</p>
<p>if you not try to change your password please contact with us</p>
</div>
`;
