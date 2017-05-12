package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class Recursion_ex2 {
    public static void main(String [] args){
        int n = 4;
        func(n);
    }

    public static void func(int k){
        //this is base case for escape loop
        if(k<=0)
            return;
        else{
            System.out.println("Hello world!");
            func(k-1);
        }
    }
}
