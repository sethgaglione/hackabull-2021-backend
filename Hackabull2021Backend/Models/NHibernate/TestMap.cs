using FluentNHibernate.Mapping;

namespace Hackabull2021Backend.Models
{
    public class TestMap : ClassMap<Test>
    {
        public TestMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);

            Table("Test");
        }
        
    }
}
