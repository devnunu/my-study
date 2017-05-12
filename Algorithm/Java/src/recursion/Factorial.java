package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class Factorial {
    public static void main(String[] args){System.out.println(factorial(3));}

    public static int factorial(int n){
        if(n==0)
            return 1;
        else{
            return n*factorial(n-1);
        }
    }
}
