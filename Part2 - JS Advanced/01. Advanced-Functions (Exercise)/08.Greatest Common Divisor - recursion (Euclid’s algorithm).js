function gcd(a, b) {
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}
gcd(45, 5);
