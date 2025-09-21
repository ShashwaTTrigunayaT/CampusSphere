#include<iostream>
using namespace std;
int main()
{
    int a,b;
    cout<<"Enter two numbers: "<<endl;
    cin>>a>>b;
    int c=a+b;
    cout<<"The sum is :"<<c++<<endl;
    cout<<"The incremented sum is :"<<c;
    return 0;
}