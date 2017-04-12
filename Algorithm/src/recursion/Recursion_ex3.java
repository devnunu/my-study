package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class Recursion_ex3 {

    public static void main(String [] args){func(5);}

    public static void func(int k){
        // Base Case
        if(k<=0)
            return;
        else{
            System.out.println("Hello world!");
            // Recursive Case
            func(k-1);
        }
    }
}
