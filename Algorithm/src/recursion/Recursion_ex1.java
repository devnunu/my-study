package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */

// this is infinity recursive loop, it needs base case

public class Recursion_ex1{
    public static void main(String [] args){
        func();
    }

    // there is no base case in this function
    public static void func(){
        System.out.println("Hello world!");
        func();
    }
}

