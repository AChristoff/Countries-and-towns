function subtract() {
    let firstNumber = $('#firstNumber').val();
    let secondNumber = $('#secondNumber').val();
    let resultArea = $('#result');
    let div = $('#result');
    let result = Number(firstNumber) - Number(secondNumber);
    div.text(result);
}

<script
src = "http://code.jquery.com/jquery-3.3.1.js"
integrity = "sha256-2Kok7MbOyxpgUVvAk/HJ2jigOSYS2auK4Pfzbm7uH60="
crossorigin = "anonymous" > < /script>