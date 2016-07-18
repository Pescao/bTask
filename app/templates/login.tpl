<form class="login clearfix" style="margin-left: 50px; margin-top: 50px;" onsubmit="return false">
    <div class="form-group">
        <label for="name">Name:</label>
        <input class="form-control" type="text" id="name" name="name" autocomplete="off" placeholder="Your name">
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input class="form-control" type="email" id="email" name="email" autocomplete="off" placeholder="Your email">
    </div>
    <div class="form-group">
        <label for="pass">Password:</label>
        <input class="form-control" type="password" id="pass" name="password" autocomplete="off" placeholder="Password">
    </div>
    <button data-action="login" class="btn pull-left">Login</button>
    <button data-action="signup" class="btn pull-left">Signup</button>
</form>