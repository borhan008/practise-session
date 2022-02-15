<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BANKING SYSTEM</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body>
    <header>
        <h2 class="text-5xl text-center mt-16 font-semibold text-green-600">B<span class="text-green-800">AN</span>K
        </h2>
    </header>
    <main>
        <section class="bg-green-400 w-3/4 mx-auto p-5 my-16">
            <div class="relative">
                <h3 class="text-3xl mb-4">Please Login</h3>
                <form action="">
                    <input id="user-email" type="text" class="block p-4 w-full border-2 border-gray-300 mb-2 rounded"
                        name="email" placeholder="sontan@baap.com" id="">
                    <input id="user-password" type="password"
                        class="block p-4 w-full border-2 border-gray-300 mb-2 rounded" name="password"
                        placeholder="secrets" id="">
                    <button class="bg-green-800 px-8 py-3 text-white  w-full font-bold absolute top-100" id="login-btn"
                        type="button">Login</button>
                </form>
            </div>
        </section>
    </main>

    <script src="script.js"></script>
</body>

</html>