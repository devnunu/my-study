package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class PrintInBinary {
    public static void main(String[] args){
        printInBinary(15);
    }

    public static void printInBinary(int n){
        if(n<2)
            System.out.print(n);
        else{
            printInBinary(n/2);
            System.out.print(n%2);
        }
    }
}
