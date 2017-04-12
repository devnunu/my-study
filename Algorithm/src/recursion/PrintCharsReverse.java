package recursion;

/**
 * Created by homr on 2017. 4. 12..
 */
public class PrintCharsReverse {
    public static void main(String[] args){
        String str = "hello everyone!";
        printCharsReverse(str);
    }

    public static void printCharsReverse(String str){
        if(str.length()==0)
            return;
        else{
            printCharsReverse(str.substring(1));
            System.out.print(str.charAt(0));
        }
    }
}
